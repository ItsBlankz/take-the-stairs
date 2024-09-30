import passport from "passport";
import supabase from "../config/supabaseConfig.js";
import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth2";

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})

export default passport.use(
    new Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        }, async (accessToken, refreshToken, profile, done) => {

<<<<<<< HEAD
            // const srn = profile.email.includes("@pesu.pes.edu") ? profile.email.split('@')[0] : null;

            // if (srn) {
            //     const { data: existingUser, error: checkError } = await supabase.from("users").select("*").eq("srn", srn).single()

            //     if (existingUser) {
            //         const { data: updatedUser, error: updateError } = await supabase
            //             .from("users")
            //             .update({
            //                 sub: profile.sub,
            //                 name: profile.displayName,
            //                 email: profile.email,
            //             })
            //             .eq("srn", srn);
            //         done(null, updatedUser ? profile : false);
            //     } else {
            //         const { data, error } = await supabase.from("users").upsert({
            //             sub: profile.sub,
            //             srn: srn,
            //             name: profile.displayName,
            //             email: profile.email,
            //         });
            //         done(null, profile);
            //     }
            // } else {
            //     const { data, error } = await supabase.from("users").upsert({
            //         sub: profile.sub,
            //         srn: null,
            //         name: profile.displayName,
            //         email: profile.email,
            //     });
            //     done(null, profile);
            // }

            const { data, error } = await supabase.from("users").upsert({
                sub: profile.sub,
                srn: profile.email.split('@')[0],
                name: profile.displayName,
                email: profile.email,
            })
            done(null, profile);
=======
            const srn = profile.email.includes("@pesu.pes.edu") ? profile.email.split('@')[0] : null;

            if (srn) {
                const { data: existingUser, error: checkError } = await supabase.from("users").select("*").eq("srn", srn).single()

                if (existingUser) {
                    const { data: updatedUser, error: updateError } = await supabase
                        .from("users")
                        .update({
                            sub: profile.sub,
                            name: profile.displayName,
                            email: profile.email,
                        })
                        .eq("srn", srn);
                    done(null, updatedUser ? profile : false);
                } else {
                    const { data, error } = await supabase.from("users").upsert({
                        sub: profile.sub,
                        srn: srn,
                        name: profile.displayName,
                        email: profile.email,
                    });
                    done(null, profile);
                }
            } else {
                const { data, error } = await supabase.from("users").upsert({
                    sub: profile.sub,
                    srn: null,
                    name: profile.displayName,
                    email: profile.email,
                });
                done(null, profile);
            }

            // const { data, error } = await supabase.from("users").upsert({
            //     sub: profile.sub,
            //     srn: profile.email.split('@')[0],
            //     name: profile.displayName,
            //     email: profile.email,
            // })
            // done(null, profile);
>>>>>>> 1731fc145744ad5a258b2e3e00f8cba03f423587

        }
    )
);
