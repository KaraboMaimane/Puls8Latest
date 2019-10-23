export class ConfigurationsProvider {
  static readonly FirebaseDatabase = {
    apiKey: "AIzaSyCI9c63kFGLwA6obewlXKUgaYuJa-dIyp8",
    authDomain: "newpuls8database.firebaseapp.com",
    databaseURL: "https://newpuls8database.firebaseio.com",
    projectId: "newpuls8database",
    storageBucket: "newpuls8database.appspot.com",
    messagingSenderId: "649926660397"
  };

  static getCity(cityName): string{
    return `https://places.cit.api.here.com/places/v1/autosuggest?at=-26.2591%2C27.9428&q=${cityName}&Accept-Language=en-US%2Cen%3Bq%3D0.9&app_id=tbylbo0FK0CPFikUrD5y&app_code=ClHE1xBVokmQpsOGeaj67A`
  }

  static readonly RegularExpName   = /^(?! )([a-zA-Z\u00C0-\u024F ']+(?:[\s-][a-zA-Z\u00C0-\u024F ']+)*){3,23}$/;
  static readonly RegularExpEmail  = /^(?! )([_a-zA-Z0-9\-.+&!/#~]+)@([a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,63})(?! )$/;
  static readonly RegularExpEmail2 = /^(?:[a-zA-Z\d_\-.]+|([_a-zA-Z0-9\-.+&!/#~]+)@([a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,63}))$/;
  static readonly PasswordValidator = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  static readonly NumericRegex4 = /([0-9]{1,4})/;
  static readonly NumericRegex6 = /([0-9]{1,6})/;
}

export class StringsAndMessages{
  static readonly ERROR_MESSAGE_INVALID_EMAIL = 'Please enter a valid email address';
  static readonly ERROR_MESSAGE_INVALID_PASSWORD = 'Please enter a alphanumeric password (min 6 char)';
  static readonly ERROR_MESSAGE_INVALID_NUMERIC_NUMBER = 'Please enter a numeric value';
  static readonly ERROR_MESSAGE_EMPTY = 'Field cannot be empty';

  static readonly REGISTER_SUCCESS_HEADING = "Yesss!";
  static readonly REGISTER_SUCCESS = "You Have Successfully Registered. Check Your Email To Verify";


  static readonly LOGIN_SUCCESS_HEADING = "Yesss!";
  static readonly LOGIN_EMAIL_WARNING_HEADING = 'Whoa, Hey There...';
  static readonly LOGIN_FAIL_HEADING = 'Oh Snap!';

  static readonly LOGIN_SUCCESS = 'You Have Successfully Logged In';
  static readonly LOGIN_EMAIL_WARNING = 'Your Email Cannot Be Empty';

}

export class Pages {
  static readonly PAGE_REGISTER = 'RegisterPage';
  static readonly PAGE_LOGIN = 'LoginPage';
  static readonly PAGE_CATEGORIES = 'CategoriesPage';
}
