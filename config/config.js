export default {
  history: 'hash',
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
        locale: {
            enable: true,
        },
      }
    ]
  ],
  // 若已有配置
  outputPath: "./build",
  theme: {
    "@primary-color": "#30b767",
  },
  routes: [
    {
      path: "/",
      component: "../layout",
      routes: [
        {
          path: "/",
          component: "resume/profile"
        },
        {
            path: "/helloworld",
            component: "Helloworld"
          },
        {
          path: "/cards",
          component: "cards"
        },
        { 
            path: "/puzzlecards", 
            component: "puzzlecards" 
        },
        {
            path: "/list",
            component: "list"
        },
        {
            path: "/upload",
            component: "upload"
        },
        {
          path: "/dashboard",
          routes: [
            { path: "/dashboard/analysis", component: "Dashboard/Analysis" },
            { path: "/dashboard/monitor", component: "Dashboard/Monitor" },
            { path: "/dashboard/workplace", component: "Dashboard/Workplace" },
            { component: '404' }
          ]
        },
        {
          path: "/resume",
          routes: [
            { path: "/resume/profile", component: "resume/profile" },
            { path: "/resume/work", component: "resume/work" },
            { path: "/resume/project", component: "resume/project" },
            { path: "/resume/other", component: "resume/other" },
            { component: '404' },
          ]
        },
        { component: '404' }
      ]
    }
  ]
};
