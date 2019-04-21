---
title: Install and upgrade Jenkins with Docker
date: 2019-03-11 15:00:00
categories: Programming
tags: 
- Docker
- Jenkinx
- CI/CD
---

## Installation

```bash
$ docker pull jenkins
$ docker run -d -p 8080:8080 -p 50000:50000 --name jenkins --restart=always jenkins 
```

## Upgrade

```bash
# check version
$ docker exec -it jenkins java -jar /usr/share/jenkins/jenkins.war --version
# download latest jenkins.war from http://updates.jenkins-ci.org/download/war/
$ wget http://updates.jenkins-ci.org/download/war/2.167/jenkins.war
# replace file
$ sudo docker cp jenkins.war jenkins:/usr/share/jenkins/
```

## Change Context to /jenkins

```bash
# edit /usr/local/bin/jenkins.sh
# find line "java -jar ..." and replace: 
java -jar /usr/share/jenkins/jenkins.war --prefix=/jenkins
```

## Reference 

[1] [Upgrade Jenkins server to a new version](https://mohitgoyal.co/2017/02/15/upgrade-jenkins-server-to-a-new-version/)