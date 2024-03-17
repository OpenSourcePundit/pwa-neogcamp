
import webpush from 'web-push';

const publicVapidKey = 'BHw7PLHQh9LdWEepjq4zlSgkPAu13qgOyVp4zNG2BCd_gkKqh6p-JWKdCc5OdUR2VH5g-RgtbYnc3OCxH3x6jsA';
const privateVapidKey = 'JMnPM-GrulfQ4vgqbF_jXfXH0P3TCaJwjWTvwoaMpB0';

export default (): void  => {
  webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey,
  );
};