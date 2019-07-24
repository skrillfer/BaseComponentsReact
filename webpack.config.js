const path = require('path');
const HWP = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
    entry: path.join(__dirname+"/src/components/index.jsx"),
    output: {
                filename: "app.bundle.js",
                path: path.join(__dirname, '/public'),
                library: 'EntryPoint',
                libraryTarget: 'var'
                
            },
    module:{
        rules:[{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },{
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                  }
            ]
        },
    /*plugins:[
                new HWP(
                    {template: path.join(__dirname,'/public/home.html')}
                )
    ]*/
}