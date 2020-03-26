
import authRoutes from './auth';
import contactRoutes from './contact';
import userRoutes from './user';
import getMessage from './message';
const routerWeb = (app)=>{
    app.use('/', authRoutes);
    app.use('/contact', contactRoutes);
    app.use('/user', userRoutes);
    app.use('/message', getMessage);
}
module.exports = routerWeb