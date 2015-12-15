module.exports = function(grunt) {

  // 项目配置(任务配置)
  grunt.initConfig({
    // 读取我们的项目配置并存储到pkg属性中
    pkg: grunt.file.readJSON('package.json'),
    // 通过connect任务，创建一个静态服务器
    connect: {
      server: {
        options: {
          // 服务器端口号
          port: 8888,
          // 服务器地址(可以使用主机名localhost，也能使用IP)
          hostname: '*',
          // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
          base: '.',
          open: true,
          livereload: true
        }
      }

    },
    // 通过watch任务，来监听文件是否有更改
    watch: {
      client: {
        // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
        options: {
          livereload: true
        },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['**']
      }
    }
  }); // grunt.initConfig配置完毕

  // 加载插件
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 自定义任务
  grunt.registerTask('live', ['connect', 'watch']);
};
