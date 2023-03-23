const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './static/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
			{
				test: /\.css$/,
        use: [
					'style-loader', 'css-loader', 
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								'plugins': ['tailwindcss']
							}
						}
					}
			  ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
	},
	devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};


