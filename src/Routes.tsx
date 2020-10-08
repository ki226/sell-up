import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalStyle from "./app/view/styles/GlobalStyle";
import Splash from "./app/view/pages/Splash";
import SignUp from "./app/view/pages/Account/SignUp";
import LogIn from "./app/view/pages/Account/LogIn";
import WTask from "./app/view/pages/TaskList/WTask";
import TaskList from "./app/view/pages/TaskList/TaskList";
import FilterPage from "./app/view/pages/TaskList/FilterPage";
import ProductCode from "./app/view/pages/TaskList/ProductCode";
import UpcomingStock from "app/view/pages/TaskList/UpcomingStock";
import { ProductCodeProvider } from "./app/view/contexts/ProductCodeContext";
import { FilterContextProvider } from "./app/view/contexts/FilterContext";
import { TaskListContextProvider } from "./app/view/contexts/TaskListContext";

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <FilterContextProvider>
          <ProductCodeProvider>
            <TaskListContextProvider>
              <Route exact path="/" component={Splash} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/filter" component={FilterPage} />
              <Route exact path="/tasks" component={TaskList} />
              <Route exact path="/wtask/:id" component={WTask} />
              <Route exact path="/productcode/:id" component={ProductCode} />
              <Route exact path="/stock" component={UpcomingStock} />
            </TaskListContextProvider>
          </ProductCodeProvider>
        </FilterContextProvider>
      </Switch>
    </Router>
  );
};

export default Routes;
