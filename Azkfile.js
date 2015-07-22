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
      // "ln -s node_modules/.bin/phonegap && chmod a+x phonegap",
      // "ln -s node_modules/bower/bin/bower && chmod a+x bower",
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
    envs: {
      // set instances variables
      EXAMPLE: "value",
    },
    wait: { retry: 7, timeout: 7000 },
  },
});
