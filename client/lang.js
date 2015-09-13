import env from 'libs/env';
import langs from 'config/langs';


export default langs[env.get('lang')];
