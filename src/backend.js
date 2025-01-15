const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const DiscordStrategy = require('passport-discord');
const config = require('../config.json');
module.exports = function(app, connection) {
    passport.serializeUser((user, done) => {
        done(null, { id: user.id, type: user.discordid ? 'discord' : 'local' });
    });
    passport.deserializeUser((obj, done) => {
        const query = obj.type === 'discord' ? 'SELECT * FROM users WHERE discordid = ?' :  'SELECT * FROM users WHERE id = ?';        
        connection.query(query, [obj.id], (err, rows) => {
            if (err) return done(err);
            done(null, rows[0]);
        });
    });

    passport.use(new DiscordStrategy({
        clientID: config.discord.clientId,
        clientSecret: config.discord.clientSecret,
        callbackURL: config.discord.callbackURL,
        scope: ['identify', 'email']
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            connection.query('SELECT * FROM users WHERE discordid = ?', [profile.id], async (err, rows) => {
                if (err) {
                    console.error('Database error:', err);
                    return done(err);
                }
                
                const userData = {
                    discordid: profile.id,
                    username: profile.username,
                    email: profile.email,
                    avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
                    accesstoken: accessToken,
                    refreshtoken: refreshToken
                };

                if (rows.length > 0) {
                    connection.query('UPDATE users SET ? WHERE discordid = ?', [userData, profile.id], (err) => {
                        if (err) {
                            console.error('Update error:', err);
                            return done(err);
                        }
                        return done(null, { ...rows[0], ...userData });
                    });
                } else {
                    connection.query('INSERT INTO users SET ?', userData, (err, result) => {
                        if (err) {
                            console.error('Insert error:', err);
                            return done(err);
                        }
                        userData.id = result.insertId;
                        return done(null, userData);
                    });
                }
            });
        } catch (err) {
            console.error('Discord strategy error:', err);
            return done(err, null);
        }
    }));

    app.get('/auth/discord', (req, res, next) => {
        passport.authenticate('discord')(req, res, next);
    });

    app.get('/auth/discord/callback', 
        passport.authenticate('discord', {
            failureRedirect: '/',
            failureFlash: true
        }),
        function(req, res) {
            console.log('Auth callback successful');
            res.redirect('/dashboard');
        }
    );

    app.use((err, req, res, next) => {
        console.error('Auth error:', err);
        res.redirect('/');
    });

    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });

    const isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/');
    };
}