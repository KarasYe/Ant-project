export default {
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
      path: "/blood_bound",
      component: "../layout/layoutBB",
      routes: [
        {
          path: "/blood_bound",
          component: "BloodBound"
        }
      ]
    },
    {
      path: "/",
      component: "../layout",
      routes: [
        {
          path: "/",
          component: "resume/profile"
        },
        {
          path: "/myPlan",
          component: 'planning/myPlan'
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
            path: "/upload",
            component: "upload"
        },
        {
          path: "/list",
          component: "/list"
        },
        {
          path: "/dashboard",
          routes: [
            { path: "/dashboard/analysis", component: "Dashboard/Analysis" },
            { path: "/dashboard/monitor", component: "Dashboard/Monitor" },
            { path: "/dashboard/workplace", component: "Dashboard/Workplace" },
          ]
        },
        {
          path: "/resume",
          routes: [
            { path: "/resume/profile", component: "resume/profile" },
            { path: "/resume/work", component: "resume/work" },
            { path: "/resume/project", component: "resume/project" },
            { path: "/resume/other", component: "resume/other" }
          ]
        },
        { component: '404' }
      ]
    }
  ]
};
