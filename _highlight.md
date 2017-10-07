## ABAP

``` abap
lo_obj ?= lo_obj->do_nothing( 'Char' && ` String` ).

SELECT SINGLE * FROM mara INTO ls_mara WHERE matkl EQ '1324'.
LOOP AT lt_mara ASSIGNING <mara>.
  CHECK <mara>-mtart EQ '0001'.
ENDLOOP.
```

## ACTIONSCRIPT

``` actionscript
function hello(name:String):void
{
	trace("hello " + name);
}
```

## APACHE

``` apache
AddDefaultCharset UTF-8

RewriteEngine On

# Serve gzipped version if available and accepted
AddEncoding x-gzip .gz
RewriteCond %{HTTP:Accept-Encoding} gzip
RewriteCond %{REQUEST_FILENAME}.gz -f
RewriteRule ^(.*)$ $1.gz [QSA,L]
<FilesMatch \.css\.gz$>
  ForceType text/css
  Header append Vary Accept-Encoding
</FilesMatch>
<FilesMatch \.js\.gz$>
  ForceType application/javascript
  Header append Vary Accept-Encoding
</FilesMatch>
<FilesMatch \.html\.gz$>
  ForceType text/html
  Header append Vary Accept-Encoding
</FilesMatch>
```

## APIBLUEPRINT

``` apib
FORMAT: 1A
HOST: http://polls.apiblueprint.org/

# Polls

Polls is a simple API allowing consumers to view polls and vote in them.

# Polls API Root [/]

## Group Question

Resources related to questions in the API.

## Question [/questions/{question_id}]

+ Parameters
    + question_id: 1 (number, required) - ID of the Question in form of an integer

+ Attributes
    + question: `Favourite programming language?` (required)
    + published_at: `2014-11-11T08:40:51.620Z` - An ISO8601 date when the question was published
    + choices (array[Choice], required) - An array of Choice objects
    + url: /questions/1

### View a Questions Detail [GET]

+ Response 200 (application/json)
    + Attributes (Question)

### Delete a Question [DELETE]

+ Relation: delete
+ Response 204
```

## APPLESCRIPT

``` applescript
-- AppleScript playing with iTunes
tell application "iTunes" to get current selection
```

## BSL

``` bsl
#Область ПрограммныйИнтерфейс

Процедура ПриветМир() Экспорт
    Сообщить("Привет мир");
КонецПроцедуры

#КонецОбласти
```

## C

``` c
#include "ruby/ruby.h"

static int
clone_method_i(st_data_t key, st_data_t value, st_data_t data)
{
    clone_method((VALUE)data, (ID)key, (const rb_method_entry_t *)value);
    return ST_CONTINUE;
}
```

## CEYLON

``` ceylon
shared class CeylonClass<Parameter>()
    given Parameter satisfies Object {
    
    shared String name => "CeylonClass";
} 

shared void run() => CeylonClass();
```

## CFSCRIPT

``` cfc
component accessors="true" {

  property type="string" name="firstName" default="";
  property string username;

  function init(){
    return this;
  }

  public any function submitOrder( required product, coupon="", boolean results=true ){

    var foo = function( required string baz, x=true, y=false ){
      return "bar!";
    };

    return foo;
  }
}
```

## CLOJURE

``` clojure
(defn make-adder [x]
  (let [y x]
    (fn [z] (+ y z))))
(def add2 (make-adder 2))
(add2 4)
```

## CMAKE

``` cmake
cmake_minimum_required(VERSION 2.8.3)

project(foo C)

# some note
add_executable(foo utils.c "foo.c")
target_link_libraries(foo ${LIBRARIES})
```

## COFFEESCRIPT

``` coffeescript
# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x
```

## COMMON LISP

``` lisp
(defun square (x) (* x x))
```

## COQ

``` coq
Require Import Coq.Lists.List.

Section with_T.
  Context {T : Type}.

  Fixpoint length (ls : list T) : nat :=
    match ls with
    | nil => 0
    | _ :: ls => S (length ls)
    end.
End with_T.

Definition a_string := "hello \" world".
```

## CPP

``` cpp
#include<iostream>

using namespace std;

int main()
{
    cout << "Hello World" << endl;
}
```

## CSHARP

``` csharp
// reverse byte order (16-bit)
public static UInt16 ReverseBytes(UInt16 value)
{
  return (UInt16)((value & 0xFFU) << 8 | (value & 0xFF00U) >> 8);
}
```

## CSS

``` css
body {
    font-size: 12pt;
    background: #fff url(temp.png) top left no-repeat;
}
```

## D

``` d
import std.algorithm, std.conv, std.functional,
    std.math, std.regex, std.stdio;

alias round = pipe!(to!real, std.math.round, to!string);
static reFloatingPoint = ctRegex!`[0-9]+\.[0-9]+`;

void main()
{
    // Replace anything that looks like a real
    // number with the rounded equivalent.
    stdin
        .byLine
        .map!(l => l.replaceAll!(c => c.hit.round)
                                (reFloatingPoint))
        .each!writeln;
}
```

## DART

``` dart
void main() {
  var collection=[1,2,3,4,5];
  for(var a in collection){
    print(a);
  }
}
```

## DIFF

``` diff
--- file1	2012-10-16 15:07:58.086886874 +0100
+++ file2	2012-10-16 15:08:07.642887236 +0100
@@ -1,3 +1,3 @@
 a b c
-d e f
+D E F
 g h i
```

## DOCKER

``` dockerfile
maintainer First O'Last

run echo \
  123 $bar
# comment
onbuild add . /app/src
onbuild run echo \
  123 $bar
CMD /bin/bash
```

## EIFFEL

``` eiffel
note
  description: "Represents a person."

class
  PERSON

create
  make, make_unknown

feature {NONE} -- Creation

  make (a_name: like name)
      -- Create a person with `a_name' as `name'.
    do
      name := a_name
    ensure
      name = a_name
    end

  make_unknown
    do ensure
      name = Void
    end

feature -- Access

  name: detachable STRING
      -- Full name or Void if unknown.

end
```

## ELIXIR

``` elixir
Enum.map([1,2,3], fn(x) -> x * 2 end)
```

## ERB

``` erb
<title><%= @title %></title>
```

## ERLANG

``` erlang
%%% Geometry module.
-module(geometry).
-export([area/1]).

%% Compute rectangle and circle area.
area({rectangle, Width, Ht}) -> Width * Ht;
area({circle, R})            -> 3.14159 * R * R
```

## FACTOR

``` factor
USING: io kernel sequences ;

4 iota [
    "Happy Birthday " write 2 = "dear NAME" "to You" ? print
] each
```

## FORTRAN

``` fortran
program bottles

    implicit none
    integer :: nbottles

    do nbottles = 99, 1, -1
        call print_bottles(nbottles)
    end do

contains

    subroutine print_bottles(n)
        implicit none
        integer, intent(in) :: n

        write(*, "(I0, 1X, 'bottles of beer on the wall,')") n
        write(*, "(I0, 1X, 'bottles of beer.')") n
        write(*, "('Take one down, pass it around,')")
        write(*, "(I0, 1X, 'bottles of beer on the wall.', /)") n - 1
    end subroutine print_bottles

end program bottles
```

## FSHARP

``` fsharp
(* Binary tree with leaves car­rying an integer. *)
type Tree = Leaf of int | Node of Tree * Tree

let rec existsLeaf test tree =
  match tree with
  | Leaf v -> test v
  | Node (left, right) ->
      existsLeaf test left
      || existsLeaf test right

let hasEvenLeaf tree =
  existsLeaf (fun n -> n % 2 = 0) tree
```

## GHERKIN

``` gherkin
# language: en
Feature: Addition
  In order to avoid silly mistakes
  As a math idiot
  I want to be told the sum of two numbers

  Scenario Outline: Add two numbers
    Given I have entered <input_1> into the calculator
    And I have entered <input_2> into the calculator
    When I press <button>
    Then the result should be <output> on the screen

  Examples:
    | input_1 | input_2 | button | output |
    | 20      | 30      | add    | 50     |
    | 2       | 5       | add    | 7      |
    | 0       | 40      | add    | 40     |
```

## GLSL

``` glsl
#version 330 core

uniform mat4 worldMatrix;

layout(location = 0) in vec2 position;
layout(location = 1) in vec4 color;

out vec4 vertexColor;

void main()
{
    vertexColor = color;
    gl_Position = vec4(position, 0.0, 1.0);
}
```

## CMAKE

``` cmake
#version 330 core

uniform mat4 worldMatrix;

layout(location = 0) in vec2 position;
layout(location = 1) in vec4 color;

out vec4 vertexColor;

void main()
{
    vertexColor = color;
    gl_Position = vec4(position, 0.0, 1.0);
}
```

## GO

``` go
package main

import "fmt"

func main() {
	fmt.Println("Hello, 世界")
}
```

## GRADLE

``` gradle
apply plugin: 'java'

repositories {
  jcenter()
}

dependencies {
  compile 'org.openjdk.jmh:jmh-core:1.12'
  compile 'org.openjdk.jmh:jmh-generator-annprocess:1.12'
}
```

## GROOVY

``` groovy
class Greet {
  def name
  Greet(who) { name = who[0].toUpperCase() +
                      who[1..-1] }
  def salute() { println "Hello $name!" }
}

g = new Greet('world')  // create object
g.salute()               // output "Hello World!"
```

## HAML

``` haml
%section.container
  %h1= post.title
  %h2= post.subtitle
  .content
    = post.content
```

## HANDLEBARS

``` handlebars
<div class="entry">
  <h1>{{title}}</h1>
  {{#with story}}
    <div class="intro">{{{intro}}}</div>
    <div class="body">{{{body}}}</div>
  {{/with}}
</div>
```

## HASKELL

``` haskell
quicksort :: Ord a => [a] -> [a]
quicksort []     = []
quicksort (p:xs) = (quicksort lesser) ++ [p] ++ (quicksort greater)
    where
        lesser  = filter (< p) xs
        greater = filter (>= p) xs
```

## HTML

``` html
<html>
  <head><title>Title!</title></head>
  <body>
    <p id="foo">Hello, World!</p>
    <script type="text/javascript">var a = 1;</script>
    <style type="text/css">#foo { font-weight: bold; }</style>
  </body>
</html>
```

## HTTP

``` http
POST /demo/submit/ HTTP/1.1
Host: rouge.jneen.net
Cache-Control: max-age=0
Origin: http://rouge.jayferd.us
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2)
    AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7
Content-Type: application/json
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Referer: http://pygments.org/
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
Accept-Charset: windows-949,utf-8;q=0.7,*;q=0.3

{"name":"test","lang":"text","boring":true}
```

## IDLANG

``` idl
for i = 99L, 0, -1 do begin

  print, i, format="(I0, 1X, 'bottles of beer on the wall,')"
  print, i, format="(I0, 1X, 'bottles of beer.')"
  print, 'Take one down, pass it around,'
  print, i, format="(I0, 1X, 'bottles of beer on the wall.', /)"

endfor
```

## INI

``` ini
; last modified 1 April 2001 by John Doe
[owner]
name=John Doe
organization=Acme Widgets Inc.
```

## IO

``` io
bottle := method(i,
  if(i==0, return "no more bottles of beer")
  if(i==1, return "1 bottle of beer")
  return i asString .. " bottles of beer"
)

for(i, 99, 1, -1,
  write(bottle(i), " on the wall, ", bottle(i), ",\n")
  write("take one down, pass it around,\n")
  write(bottle(i - 1), " on the wall.\n\n")
)
```

## JAVA

``` java
public class java {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

## JAVASCRIPT

``` javascript
$(document).ready(function() { alert('ready!'); });
```

## JINJA

``` jinja
{% extends "layout.html" %}

{% block body %}
  <ul>
  {% for user in users %}
    <li><a href="{{ user.url }}">{{ user.username }}</a></li>
  {% endfor %}
  </ul>
{% endblock %}
```

## JSON

``` json
{ "one": 1, "two": 2, "null": null, "simple": true }
```

## JSON-DOC

``` json5
{ "one": 1, "two": 2, "null": null, "simple": true } // a simple json object
```

## JSX

``` jsx
var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
        Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
      </p>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <HelloWorld date={new Date()} />,
    document.getElementById('example')
  );
}, 500);
```

## JULIA

``` julia
function mandel(z)
    c = z
    maxiter = 80
    for n = 1:maxiter
        if abs(z) > 2
            return n-1
        end
        z = z^2 + c
    end
    return maxiter
end
```

## KOTLIN

``` kotlin
fun main(args: Array<String>) {
    println("Hello, world!")
}
```

## LIQUID

``` liquid
<ul id="products">
  {% for product in products %}
    <li>
      <h2>{{ product.title }}</h2>
      Only {{ product.price | format_as_money }}

      <p>{{ product.description | prettyprint | truncate: 200  }}</p>

    </li>
  {% endfor %}
</ul>
```

## LITERATE COFFEESCRIPT

``` literate-coffeescript
Import the helpers we plan to use.

    {extend, last} = require './helpers'
```

## LITERATE HASKELL

``` literate-haskell
In Bird-style you have to leave a blank before the code.

> fact :: Integer -> Integer
> fact 0 = 1
> fact n = n * fact (n-1)

And you have to leave a blank line after the code as well.
```

## LLVM

``` ll
; copied from http://llvm.org/docs/LangRef.html#module-structure
; Declare the string constant as a global constant.
@.str = private unnamed_addr constant [13 x i8] c"hello world\0A\00"

; External declaration of the puts function
declare i32 @puts(i8* nocapture) nounwind

; Definition of main function
define i32 @main() {   ; i32()*
  ; Convert [13 x i8]* to i8  *...
  %cast210 = getelementptr [13 x i8]* @.str, i64 0, i64 0

  ; Call puts function to write out the string to stdout.
  call i32 @puts(i8* %cast210)
  ret i32 0
}

; Named metadata
!1 = metadata !{i32 42}
!foo = !{!1, null}
```

## LUA

``` lua
-- defines a factorial function
function fact (n)
  if n == 0 then
    return 1
  else
    return n * fact(n-1)
  end
end
    
print("enter a number:")
a = io.read("*number")        -- read a number
print(fact(a))
```

## MAKE

``` make
.PHONY: all
all: $(OBJ)

$(OBJ): $(SOURCE)
	@echo "compiling..."
	$(GCC) $(CFLAGS) $< > $@
```

## MARKDOWN

``` markdown
Markdown has cool [reference links][ref 1]
and [regular links too](http://example.com)

[ref 1]: http://example.com
```

## MATLAB

``` matlab
A = cat( 3, [1 2 3; 9 8 7; 4 6 5], [0 3 2; 8 8 4; 5 3 5], ...
                 [6 4 7; 6 8 5; 5 4 3]);
% The EIG function is applied to each of the horizontal 'slices' of A.
for i = 1:3
    eig(squeeze(A(i,:,:)))
end
```

## MOONSCRIPT

``` moonscript
util = require "my.module"

a_table = {
  foo: 'bar'
  interpolated: "foo-#{other.stuff 2 + 3}"
  "string": 2
  do: 'keyword'
}

class MyClass extends SomeClass
  new: (@init, arg2 = 'default') =>
    @derived = @init + 2
    super!

  other: =>
    @foo + 2
```

## MXML

``` mxml
<?xml version="1.0"?>
<s:ComboBox xmlns:fx="http://ns.adobe.com/mxml/2009"
    xmlns:s="library://ns.adobe.com/flex/spark"
    xmlns:mx="library://ns.adobe.com/flex/mx">

    <fx:Script>
        <![CDATA[
            [Bindable]
            private var buttonLabel:String = "Click me!";
            private var clicks:int = 0;

            function button_clicked():void {
                clicks++;
                buttonLabel = clicks.toString();
            }
        ]]>
    </fx:Script>

    <s:Button id="button"
              label="{buttonLabel}"
              click="{button_clicked()}" />
</s:ComboBox>
```

## NASM

``` nasm
%macro IRQ 2
    global irq%1
    irq%1:
        cli
        push byte 0     ; push a dummy error code
        push byte %2    ; push the IRQ number
        jmp  irq_common_stub
%endmacro

extern irq_handler

irq_common_stub:
    pusha           ; Pushes edi,esi,ebp,esp,ebx,edx,ecx,eax
    mov ax, ds      ; Lower 16-bits of eax = ds.
    push eax        ; save the data segment descriptor
    mov ax, 0x10    ; load the kernel data segment descriptor
    mov edx, eax
    call irq_handler

%assign i 0
%rep 8
ISR_NOERRCODE i
%assign i i+1
%endrep

ISR_NOERRCODE 9
```

## NGINX

``` nginx
server {
  listen          80;
  server_name     example.com *.example.com;
  rewrite ^       http://www.domain.com$request_uri? permanent;
}
```

## NIM

``` nim
import math,strutils

proc fixedWidth(input: string, minFieldSize: int):string {.inline.} =
  # Note that field size is a minimum- will expand field if input
  # string is larger
  if input.startsWith("-"):
    return(input & repeatchar(count=(abs(minFieldSize-len(input))),c=' '))
  else:
    return(" " & input & repeatchar(count=(abs(minFieldSize-len(input))-1),c=' '))

template mathOnInterval(lowbound,highbound:float,counts: int,p:proc) =
  block:
    var step:    float = (highbound - lowbound)/(max(counts,1))
    var current: float = lowbound
    while current < highbound:
      echo($fixedWidth($current,25) & ": " & $fixedWidth($p(current),25))
      current += step

echo "Sine of theta from 0 to 2*PI by PI/12"
mathOnInterval(0.0,2.0*PI,12,sin)
echo("\n")
echo "Cosine of theta from 0 to 2*PI by PI/12"
mathOnInterval(0.0,2.0*PI,12,cos)

# The first example above is much the same as:
# for i in 1..100:
#   echo($sin( (float(i)/100.0) * 2.0*PI ))
```

## OBJECTIVE C

``` objective-c
@interface Person : NSObject {
  @public
  NSString *name;
  @private
  int age;
}

@property(copy) NSString *name;
@property(readonly) int age;

-(id)initWithAge:(int)age;
@end

NSArray *arrayLiteral = @[@"abc", @1];
NSDictionary *dictLiteral = @{
  @"hello": @"world",
  @"goodbye": @"cruel world"
};
```

## OCALM

``` ml
(* Binary tree with leaves car­rying an integer. *)
type tree = Leaf of int | Node of tree * tree

let rec exists_leaf test tree =
  match tree with
  | Leaf v -> test v
  | Node (left, right) ->
      exists_leaf test left
      || exists_leaf test right

let has_even_leaf tree =
  exists_leaf (fun n -> n mod 2 = 0) tree
```

## PASCAL

``` pascal
program FizzBuzz(output);
var
  i: Integer;
begin
  for i := 1 to 100 do
    if i mod 15 = 0 then
      WriteLn('FizzBuzz')
    else if i mod 3 = 0 then
      WriteLn('Fizz')
    else if i mod 5 = 0 then
      WriteLn('Buzz')
    else
      WriteLn(i)
end.
```

## PERL

``` perl
#!/usr/bin/env perl
use warnings;
print "a: ";
my $a = "foo";
print $a;
```

## PHP

``` php
<?php
  print("Hello {$world}");
?>
```

## PLAINTEXT

``` plaintext
plain text :)
```

## POWERSHELL

``` powershell
Function Get-IPv4Scopes
<#
	.SYNOPSIS
		Read IPv4Scopes from an array of servers
	.PARAMETER Servers
		Specifies an array of servers
	.EXAMPLE
		Get-IPv4Scopes
        
		Will prompt for all inputs
#>
{
    [CmdletBinding()]
    Param(
    # 1
    [parameter(
        Mandatory=$true,
        Position=0,
        ValueFromPipelineByPropertyName=$true,
        HelpMessage="Server List"
        )]
    [string[]]$Servers,
    #2
    [parameter(Mandatory=$false,ValueFromPipeline=$false)]
    [bool]$Unique=$false
    )  #EndParam

    Begin {}

    Process {
        $arrayJobs=@()
        foreach ($server in $Servers) {
            $arrayJobs+=Invoke-Command -ComputerName $server -scriptblock {Get-DhcpServerv4Scope}  -AsJob
        }
        $complete=$false
        while (-not $complete) {
            $arrayJobsInProgress= $arrayJobs | Where-Object { $_.State -match 'running' }
            if (-not $arrayJobsInProgress) { $complete=$true }
        }
        $Scopes=$arrayJobs|Receive-Job
        $UniqueScopes=$Scopes|Sort-Object -Property ScopeId -Unique
    }

    End {
        if ($Unique) { return $UniqueScopes }
        else { return $Scopes }
    }

} #end function
```

## PROLOG

``` prolog
diff(plus(A,B), X, plus(DA, DB))
   <= diff(A, X, DA) and diff(B, X, DB).

diff(times(A,B), X, plus(times(A, DB), times(DA, B)))
   <= diff(A, X, DA) and diff(B, X, DB).

equal(X, X).
diff(X, X, 1).
diff(Y, X, 0) <= not equal(Y, X).
```

## PROPERTIES

``` properties
# You are reading the ".properties" entry.
! The exclamation mark can also mark text as comments.
website = http\://en.wikipedia.org/
language = English
country : Poland
continent=Europe
key.with.dots=This is the value that could be looked up with the key "key.with.dots".
```

## PROTOBUF

``` protobuf
message Person {
  required string name = 1;
  required int32 id = 2;
  optional string email = 3;
}
```

## PUPPET

``` puppet
service { 'ntp':
  name      => $service_name,
  ensure    => running,
  enable    => true,
  subscribe => File['ntp.conf'],
}
```

## PYTHON

``` python
def fib(n):    # write Fibonacci series up to n
    """Print a Fibonacci series up to n."""
    a, b = 0, 1
    while a < n:
        print a,
        a, b = b, a+b
```

## QML

``` qml
import QtQuick 2.0
Item {
    width: 200
    height: 100
    MouseArea {
        anchors.fill: parent
        onClicked: Qt.quit()
    }
}
```

## R

``` r
dbenford <- function(x){
    log10(1 + 1/x)
}

pbenford <- function(q){
    cumprobs <- cumsum(dbenford(1:9))
    return(cumprobs[q])
}
```

## RACKET

``` racket
#lang racket

;; draw a graph of cos and deriv^3(cos)
(require plot)
(define ((deriv f) x)
  (/ (- (f x) (f (- x 0.001))) 0.001))
(define (thrice f) (lambda (x) (f (f (f x)))))
(plot (list (function ((thrice deriv) sin) -5 5)
            (function cos -5 5 #:color 'blue)))

;; Print the Greek alphabet
(for ([i (in-range 25)])
  (displayln
   (integer->char
    (+ i (char->integer #\u3B1)))))

;; An echo server
(define listener (tcp-listen 12345))
(let echo-server ()
  (define-values (in out) (tcp-accept listener))
  (thread (λ ()
             (copy-port in out)
             (close-output-port out)))
  (echo-server))
```

## RUBY

``` ruby
class Greeter
  def initialize(name="World")
    @name = name
  end

  def say_hi
    puts "Hi #{@name}!"
  end
end
```

## RUST

``` rust
use core::*;

fn main() {
    for ["Alice", "Bob", "Carol"].each |&name| {
        do task::spawn {
            let v = rand::Rng().shuffle([1, 2, 3]);
            for v.each |&num| {
                io::print(fmt!("%s says: '%d'\n", name, num))
            }
        }
    }
}
```

## SASS

``` sass
@for $i from 1 through 3
  .item-#{$i}
    width: 2em * $i
```

## SCALA

``` scala
class Greeter(name: String = "World") {
  def sayHi() { println("Hi " + name + "!") }
}
```

## SCHEME

``` scheme
(define Y
  (lambda (m)
    ((lambda (f) (m (lambda (a) ((f f) a))))
     (lambda (f) (m (lambda (a) ((f f) a)))))))
```

## SCSS

``` scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

## SED

``` sed
/begin/,/end/ {
  /begin/n # skip over the line that has "begin" on it
  s/old/new/
}
```

## SHELL

``` shell
# If not running interactively, don't do anything
[[ -z "$PS1" ]] && return
```

## SHELL SESSION

``` sh-session
$ ls /bin/bash
/bin/bash
$ sudo su -
[sudo] password for sio4: 
# ls /bin/bash
/bin/bash
# 
# exit
logout
$ 
```

## SLIM

``` slim
doctype html
html
  body
    h1 Markup examples   
    #content
      p 
      | Slim can have #{ruby_code} interpolated!
      /[if IE]
        javascript:
          alert('Slim supports embedded javascript!')

      - unless items.empty?
        table
          - for item in items do
            tr
              td.name = item.name
              td.price = item.price
```

## SMALLTALK

``` smalltalk
quadMultiply: i1 and: i2 
    "This method multiplies the given numbers by each other
    and the result by 4."
    | mul |
    mul := i1 * i2.
    ^mul * 4
```

## SMARTY

``` smarty
{foo bar='single quotes' baz="double quotes" test3=$test3}

<ul>
  {foreach from=$myvariable item=data}
    <li>{$data.field}</li>
  {foreachelse}
    <li>No Data</li>
  {/foreach}
</ul>

<div class="{if $foo}class1{else}class2{/if}">{$foo.bar.baz}</div>
```

## SML

``` sml
datatype shape
   = Circle   of loc * real      (* center and radius *)
   | Square   of loc * real      (* upper-left corner and side length; axis-aligned *)
   | Triangle of loc * loc * loc (* corners *)
```

## SQL

``` sql
SELECT * FROM `users` WHERE `user`.`id` = 1
```

## SWIFT

``` swift
// Say hello to poeple
func sayHello(personName: String) -> String {
    let greeting = "Hello, " + personName + "!"
    return greeting
}
```

## TCL

``` tcl
proc cross_sum {s} {expr [join [split $s ""] +]}
```

## TEX

``` tex
To write \LaTeX\ you would type \verb:\LaTeX:.
```

## TOML

``` toml
# This is a TOML document. Boom.

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
organization = "GitHub"
bio = "GitHub Cofounder & CEO\nLikes tater tots and beer."
dob = 1979-05-27T07:32:00Z # First class dates? Why not?
```

## TURTLE

``` turtle
@prefix xsd:          <http://www.w3.org/2001/XMLSchema#>
@prefix dcat:         <http://www.w3.org/ns/dcat#> .
@prefix dcterms:      <http://purl.org/dc/terms/> .
@prefix foaf:         <http://xmlns.com/foaf/0.1/> .
@base                 <http://base.of.relative.iris> .

PREFIX  test:         <http://example.org>
PrEfIx  insensitive:  <http://insensitive.example.org>

GRAPH <https://trig.testing.graph> {
    <https://example.org/resource/dataset> a dcat:Dataset ; 

#-----Mandatory-----#

    dcterms:title 'Test title'@cs, "Test title"@en ;
    dcterms:description """Multiline
        string"""@cs, '''Another
        multiline string '''@en ;

#-----Recommended-----#
    dcat:contactPoint [ a foaf:Person ] ;
    test:list ( <http://ex.org> 1 1.1 +1 -1 1.2E+4 "Test" "\"Quote\"" ) ;
    test:datatype "2016-07-20"^^xsd:date ;
    test:text """next multiline""";
    .
}
```

## TWIG

``` twig
{% include 'header.html' %}

{% for user in users %}
  * {{ user.name }}
{% else %}
  No users have been found.
{% endfor %}

{% include 'footer.html' %}
```

## TYPESCRIPT

``` typescript
$(document).ready(function() { alert('ready!'); });
```

## VALA

``` vala
class Demo.HelloWorld : GLib.Object
{
    public static int main (String[] args)
    {
        stdout.printf("Hello World\n");
        return 0;
    }
}
```

## VB

``` vb
Private Sub Form_Load()
    ' Execute a simple message box that says "Hello, World!"
    MsgBox "Hello, World!"
End Sub
```

## VERILOG

``` verilog
/**
 * Verilog Lexer
 */
module Foo(
  input logic Clk_CI,
  input logic Rst_RBI,
  input logic A,
  input logic B,
  output logic C
);
  logic C_DN, C_DP;

  assign C = C_DP;

  always_comb begin : proc_next_state
    C_DN = A + B;
  end

  // Clocked process
  always_ff @(posedge Clk_CI, negedge Rst_RBI) begin
    if(~Rst_RBI) begin
      C_DP <= 1'b0;
    end else begin
      C_DP <= C_DN;
    end
  end
endmodule
```

## VHDI

``` vhd
entity toggle_demo is
	port (
		clk_in : in  std_logic; -- System Clock
		data_q : out std_logic	-- Toggling Port
	);
end entity toggle_demo;

architecture RTL of toggle_demo is
	signal data : std_logic := '0';
begin

	data_q <= data;

	data_proc : process (clk_in)
	begin
	
		if (rising_edge(clk_in)) then
			data <= not data;
		end if;
	
	end process; 

end architecture RTL;
```

## VIML

``` viml
function! s:Make(dir, make, format, name) abort
  let cd = exists('*haslocaldir') && haslocaldir() ? 'lcd' : 'cd'
  let cwd = getcwd()
  let [mp, efm, cc] = [&l:mp, &l:efm, get(b:, 'current_compiler', '')]
  try
    execute cd fnameescape(dir)
    let [&l:mp, &l:efm, b:current_compiler] = [a:make, a:format, a:compiler]
    execute (exists(':Make') == 2 ? 'Make' : 'make')
  finally
    let [&l:mp, &l:efm, b:current_compiler] = [mp, efm, cc]
    if empty(cc) | unlet! b:current_compiler | endif
    execute cd fnameescape(cwd)
  endtry
endfunction
```

## VUE

``` vue
<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script lang=coffee>
  app = new Vue
    el: '#app'
    data: { message: 'Hello Vue!' }
</script>
```

## XML

``` xml
<?xml version="1.0" encoding="utf-8"?>
<xsl:template match="/"></xsl:template>
```

## YAML

``` yaml
---
one: Mark McGwire
two: Sammy Sosa
three: Ken Griffey
```
