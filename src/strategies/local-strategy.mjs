import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../mongoose/schemas/user.mjs';

passport.serializeUser((user, done) => {
    console.log('inside serialaze user:', user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Inside deserialazie:', id);
    try {
        const findUser = await User.findById(id);
        if (!findUser) {
            throw new Error('User not Found');
        }
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

// validate user object
export default passport.use(
    new Strategy(async (username, password, done) => {
        console.log(username);
        console.log(password);
        try {
            const findUser = await User.findOne({ name });
            if (!findUser) {
                throw new Error('user not found');
            }
            if (findUser.password !== password) {
                throw new Error('Invalid Credentials');
            }
            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })
);
