var named = require('./lib/index');
var server = named.createServer();
var ttl = 300;
var suffix = ".electrum-node.nav.community";

server.listen(53, '0.0.0.0', function() {
  console.log('DNS server started on port 53');
});

server.on('query', function(query) {
  var domain = query.name();
  console.log('DNS Query: %s', domain)
  if (domain.endsWith(suffix)) {
    query.addAnswer( domain, new named.ARecord(domain.substring(0, domain.length - suffix.length), ttl ) );
    server.send(query);
  }
});
