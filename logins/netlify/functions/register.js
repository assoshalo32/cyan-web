const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
});

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method not allowed' };
    }

    try {
        const { username, email, phone, password } = JSON.parse(event.body);

        const { count: existingCount, error: checkError } = await supabaseAdmin
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .or(`username.eq.${username},email.eq.${email},phone.eq.${phone}`);

        if (checkError) throw checkError;
        if (existingCount > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Username, email, or phone already exists.' })
            };
        }

        const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: { username, phone }
            }
        });

        if (signUpError) throw signUpError;

        const { data: session } = await supabaseClient.auth.getSession();

        return {
            statusCode: 200,
            body: JSON.stringify({ session: session.session })
        };
    } catch (error) {
        console.error('Register error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};