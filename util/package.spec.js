import test from 'ava';
import packageUtil from './package';

test( 'getAuthor - author is a string', t => {
  // only short hand name
  let packageJson1 = {
    author : 'Bob Calsow'
  };

  let author1 = packageUtil.getAuthor( packageJson1 );

  t.same(
    author1,
    { name : 'Bob Calsow', email : undefined, url : undefined }
  );

  // short hand name and email
  let packageJson2 = {
    author : 'Bob Calsow <bob@calsow.io>'
  };

  let author2 = packageUtil.getAuthor( packageJson2 );

  t.same(
    author2,
    { name : 'Bob Calsow', email : 'bob@calsow.io', url : undefined }
  );

  // short hand name, email and url
  let packageJson3 = {
    author : 'Bob Calsow <bob@calsow.io> (http://4waisenkinder.de)'
  };

  let author3 = packageUtil.getAuthor( packageJson3 );

  t.same(
    author3,
    { name : 'Bob Calsow', email : 'bob@calsow.io', url : 'http://4waisenkinder.de' }
  );

  // short hand name and url
  let packageJson4 = {
    author : 'Bob Calsow (http://4waisenkinder.de)'
  };

  let author4 = packageUtil.getAuthor( packageJson4 );

  t.same(
    author4,
    { name : 'Bob Calsow', email : undefined, url : 'http://4waisenkinder.de' }
  );

  t.end();
} );

test( 'getAuthor - author is an object', t => {
  let packageJson = {
    author : {
      name  : 'Bob Calsow',
      email : 'bob@calsow.io',
      url   : 'http://4waisenkinder.de'
    }
  };

  let author = packageUtil.getAuthor( packageJson );

  t.same( author, packageJson.author );
  t.end();
} );

test( 'getAuthor - author is not defined', t => {
  let packageJson = {};

  let author = packageUtil.getAuthor( packageJson );

  t.same( author, false );
  t.end();
} );


test( 'getMaintainers - maintainers is not defined', t => {
  let packageJson = {
    maintainers : [
      'Bob Calsow <bob@calsow.io> (http://4waisenkinder.de)',
      {
        name  : 'Foo bar',
        email : 'foo@bar.io',
        url   : 'http://foo.bar'
      }
    ]
  };

  let maintainers = packageUtil.getMaintainers( packageJson );

  t.same(
    maintainers[ 0 ],
    { name : 'Bob Calsow', email : 'bob@calsow.io', url : 'http://4waisenkinder.de' }
  );
  t.same(
    maintainers[ 1 ],
    { name : 'Foo bar', email : 'foo@bar.io', url : 'http://foo.bar' }
  );
  t.end();
} );

test( 'getMaintainers - maintainers is an invalid string', t => {
  let packageJson = {
    maintainers : 'Bob Calsow <bob@calsow.io> (http://4waisenkinder.de)'
  };

  let maintainers = packageUtil.getMaintainers( packageJson );

  t.same(
    maintainers[ 0 ],
    { name : 'Bob Calsow', email : 'bob@calsow.io', url : 'http://4waisenkinder.de' }
  );
  t.end();
} );

test( 'getMaintainers - maintainers is not defined', t => {
  let packageJson = {};

  let maintainers = packageUtil.getMaintainers( packageJson );

  t.same( maintainers, false );
  t.end();
} );
