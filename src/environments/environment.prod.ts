export const environment = {
  production: true,
  secret: {
    googleMapKey: 'AIzaSyARR7uFPjj5hVSlCnTgYiq0VnfG2qM8d_A'
  },
  api: {
     googleLocationAPI(lat,lng){
      return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.secret.googleMapKey}`;
    }
  }
};
