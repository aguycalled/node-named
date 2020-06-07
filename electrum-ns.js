var named = require('./lib/index');
var server = named.createServer();
var ttl = 300;
var suffix = ".electrum-node.nav.community";

server.listen(53, '0.0.0.0', function() {
  console.log('DNS server started on port 53');
});

server.on('query', function(query) {
  var domain = query.name();
  var type = query.type();
  console.log('DNS %s Query: %s', type, domain)
  if (domain.endsWith(suffix)) {
    if (type == 'CAA') {
      query.addAnswer( domain, new named.CAARecord(0, "issuewild",'letsencrypt.org'));
      server.send(query);
    } else if (type == 'A') {
      query.addAnswer( domain, new named.ARecord(domain.substring(0, domain.length - suffix.length), ttl ) );
      server.send(query);
    }
  }
});
