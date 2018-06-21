const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../routes/users');
const config = require('../config/database');
const Story = require('../routes/story_infos');

module.exports = function(passport){
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
		//console.log(jwt_payload); 
		User.getUserById(jwt_payload._id, (err, user) => {
			if(err){
				return done(err, false);
			}
			if(user){
				return done(null, user);
			} else{
				return done(null, false);
			}
		});
		// Story.getStoryById(jwt_payload._id, (err, story) => {
		// 	if(err){
		// 		return done(err, false);
		// 	}
		// 	if(story){
		// 		return done(null, story);
		// 	} else{
		// 		return done(null, false);
		// 	}
		// });
	}));
}