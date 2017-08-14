import {randomBytes} from 'crypto';
import createError from 'http-errors';
import promisify from '../lib/promisify.js';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Mongoose, {Schema} from 'mongoose';
import faker from 'faker';

const userSchema = new Schema({
  passwordHash: {type: String},
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  tokenSeed: {type: String, required: true, default: ''},
});

userSchema.methods.passwordCompare = function(password){
  console.log('passwordHashCompare', password);
  return bcrypt.compare(password, this.passwordHash)
    .then(success => {
      if(!success)
        throw createError(401, 'AUTH ERROR: wrong password');
      return this;
    });
};

userSchema.methods.tokenCreate = function (){
  this.tokenSeed = randomBytes(32).toString('base64');
  return this.save()
    .then(user => {
      return jwt.sign({tokenSeed: this.tokenSeed}, process.env.SECRET);
    })
    .then(token => {
      return token;
    });
};

const User = Mongoose.model('user', userSchema);

User.createFromSignup = function(user){
  if(!user.password || !user.email || !user.username)
    return Promise.reject(
      createError(400, 'VALIDATION ERROR: missing username email or password'));

  let {password} = user;
  user = Object.assign({}, user, {password: undefined});

  return bcrypt.hash(password, 1)
    .then(passwordHash => {
      let data = Object.assign({}, user, {passwordHash});
      return new User(data).save();
    });
};

User.handleOAUTH = function(data){
  if(!data || !data.email)
    return Promise.reject(
      createError(400, 'VALIDATION ERROR: missing email'));
  return User.findOne({email: data.email})
    .then(user => {
      if(!user)
        throw new Error('create the user');
      console.log('loggin into account');
      return user;
    })
    .catch(() => {
      console.log('creating account');
      return new User({
        username: faker.internet.userName(),
        email: data.email,
      }).save();
    });
};

User.fromToken = function(token){
  return promisify(jwt.verify)(token, process.env.SECRET)
    .then(({tokenSeed}) => User.findOne({tokenSeed}))
    .then((user) => {
      if(!user)
        throw createError(401, 'AUTH ERROR: user not found');
      return user;
    });
};

export default User;
