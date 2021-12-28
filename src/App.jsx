import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import routers from './router/index';

function APP() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          {routers.map((r, key) => (
            <Route
              component={r.component}
              exact={r.exact}
              key={key}
              path={r.path}
            />
          ))}
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default APP;
