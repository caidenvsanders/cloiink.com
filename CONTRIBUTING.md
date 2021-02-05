# Contributing to cloink.net.

Want to contribute to this repository? There are a few things you need to know.  

For each of the following subcategories, developing, building, and testing, there are two different packages: the API and WebFrontend. All of these commands also expect you to be in the root directory: cloink.net.

# Developing

* For API: yarn --cwd packages/api dev
* For WebFrontend: yarn --cwd packages/frontend start

# Building

* For API: yarn APIBuildCI
* For WebFrontend: yarn WebFrontendBuildCI

# Testing

* For API: yarn APITestCI
* For WebFrontend: yarn WebFrontendTestCI
