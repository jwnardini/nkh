var path = require('path');
var webpack = require('webpack');
var jQuery = require('jquery');


module.exports = function(gulpConfig) {
 var config = {
   entry: {
     'js/script': gulpConfig.src.scripts.chief,
     'js/carousel': gulpConfig.src.scripts.carousel,
     'js/modal': gulpConfig.src.scripts.modal,
     'js/map': gulpConfig.src.scripts.map,
     'fabricator/js/fabricator': gulpConfig.src.scripts.fabricator
   },
   output: {
     path: path.resolve(__dirname, gulpConfig.dest),
     filename: '[name].js'
   },
   externals: {
     // Use Jquery as an externally loaded file
     'jquery': 'jQuery'
   },
   module: {
     loaders: [
       {
         // Used for loading css files from modules using js
         test: /\.css$/,
         include: /node_modules/,
         loader: 'style-loader!css-loader'
       },
       {
         // required for loading images in css from modules using js
         test: /\.(png|jpg|svg|gif)$/,
         include: /node_modules/,
         loader: 'url-loader?limit=20000' // (20kb) Any file smaller than limit will use data uri instead
       },
       {
         // For modernizr JSON option names: https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json
        test: /\.modernizrrc$/,
        loader: 'modernizr'
      }
     ]
   },
   resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc')
    }
  },
   plugins: [
     // loads jquery within the context of the files and provides it as a global variable for files
     // new webpack.ProvidePlugin({
     //   '$':'jquery',
     //   'jQuery':'jquery',
     //   'window.jQuery':'jquery'
     // })
  ]
 }

  if (!gulpConfig.dev) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return config;
};
