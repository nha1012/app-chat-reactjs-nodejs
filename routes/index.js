
import authRoutes from './auth';
import contactRoutes from './contact';
import userRoutes from './user';
import getMessage from './message';
import subscription from './subscription';
const routerWeb = (app)=>{
    app.use('/', authRoutes);
    app.use('/contact', contactRoutes);
    app.use('/user', userRoutes);
    app.use('/message', getMessage);
    app.use('/subscription', subscription);
}
module.exports = routerWeb
