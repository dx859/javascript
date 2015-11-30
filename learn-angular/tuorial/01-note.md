# What to use Directives, Controllers, or Services in AngularJS

## Service
1. How to share data between chunks of code in your application

  - First we'll setup a module. We'll use this throughout the article.

  ```javascript
  var module = angular.module( "my.new.module", [] ); 
  ```

  - Next, we’ll create a new service. Let’s say this module will be used for managing books.

  ```javascript
  module.service( 'Book', [ '$rootScope', function( $rootScope ) {
    var service = {
      books: [
       { title: "Magician", author: "Raymond E. Feist" },
       { title: "The Hobbit", author: "J.R.R Tolkien" }
      ],

      addBook: function ( book ) {
       service.books.push( book );
       $rootScope.$broadcast( 'books.update' );
      }
    }

    return service;
  }]);
  ```

  -  Now, what we can do is pass this service around to the various controllers, directives, filters or whatever else may need it

  ```javascript
  var ctrl = [ '$scope', 'Book', function( scope, Book ) {
    scope.$on( 'books.update', function( event ) {
      scope.books = Book.books;
    });
  
    scope.books = Book.books;
  }];
  
  module.controller( "books.list", ctrl );
  ```

  - When do we use services? Whenever we want to share **data** across domains

## Controllers

1. Controllers in Angular do not handle “requests” per se

2. Controllers should be used purely to wire up services, dependencies and other objects, and assign them to the view via scope.

## Directives