const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js', // Entry point
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js' // Output bundle file name
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to HTML file
            filename: 'index.html' // Output HTML file name
        })
    ],
    module: {
        rules: [
    
          // css stylesheet loaders
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
        ]
    }
};