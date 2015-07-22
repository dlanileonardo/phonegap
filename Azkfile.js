/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  phonegap: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: { "docker": "azukiapp/node" },
    provision: [
      "npm install",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "node_modules/.bin/phonegap serve",
    mounts: {
      '/azk/#{manifest.dir}': path("."),
    },
    ports: {
      http: "23825:3000/tcp",
    },
    scalable: {"default": 1},
    http: {
      domains: ["#{system.name}.#{azk.default_domain}"],
    },
    export_envs: {
      APP_URL: "#{system.name}.#{azk.default_domain}:#{net.port.http}"
    },
    wait: { retry: 7, timeout: 7000 },
  },

  ngrok: {
    // Dependent systems
    depends: [ "mondelez" ],
    image : { docker: "azukiapp/ngrok" },
    // Mounts folders to assigned paths
    mounts: {
      '/#{system.name}/log' : path("./log"),
    },
    scalable: { default: 0,  limit: 1 }, // disable auto start
    wait: {"retry": 20, "timeout": 1000},
    http      : {
      domains: [ "#{manifest.dir}-#{system.name}.#{azk.default_domain}" ],
    },
    ports     : {
      http : "4040"
    },
    envs      : {
      NGROK_CONFIG    : "/ngrok/ngrok.yml",
      NGROK_LOG       : "/#{system.name}/log/ngrok.log",
      // NGROK_SUBDOMAIN : "#{manifest.dir}",
      // NGROK_AUTH      : "",
    }
  }
});
