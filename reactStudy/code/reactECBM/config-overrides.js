const {override, fixBabelImports, addLessLoader} = require('customize-cra')

module.exports = override(
    //使用babel-plugin-import来针对antd实现按需打包
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars:{'@primary-color': '#1DA57A'},
        }
        
    })
)