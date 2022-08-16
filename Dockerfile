FROM ruby:3.1.2-slim-bullseye
WORKDIR /srv/www

# if you're not using a ruby image:
# zlib is required by jekyll
# make sure you use ruby3, not 2
RUN apt-get update && apt-get install -y \
	bundler \
	jekyll \
	git

COPY Gemfile ./Gemfile
RUN bundle install

