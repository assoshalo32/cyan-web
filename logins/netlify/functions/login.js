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
        const { identifier, password } = JSON.parse(event.body);

        let { data: profile, error: queryError } = await supabaseAdmin
            .from('profiles')
            .select('email')
            .or(`username.eq.${identifier},email.eq.${identifier},phone.eq.${phone}`)
            .maybeSingle();

        if (queryError) throw queryError;
        if (!profile) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'User not found.' })
            };
        }

        const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
            email: profile.email,
            password
        });

        if (authError) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Incorrect password.' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ session: authData.session })
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};