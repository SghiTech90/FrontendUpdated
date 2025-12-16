import {CommonActions} from '@react-navigation/native';

let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    );
  }
};

const goBack = () => {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
};

const replace = (routeName, params) => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: routeName,
            params,
          },
        ],
      }),
    );
  }
};

export default {navigate, goBack, setTopLevelNavigator, replace};
