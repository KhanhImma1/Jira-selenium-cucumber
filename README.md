# Jira-selenium-cucumber

The Jira selenium framework aims to provide ways for testing modules of projects, issues,...
Test feature for Jira web application

## Prerequisites

Before you continue, ensure you meet the following requirements:

* You have installed the latest version of Nodejs

#### Technologies

- Typescript
- Selenium-webdriver
- Cucumber

## Installation

```
# Clone to local:
git clone https://github.com/KhanhImma1/Jira-selenium-cucumber.git

# Run all testcase by file final_exam:
$ npx cucumber-js ./features/final_exam.feature

# Run testcase by tags:
$ npx cucumber-js --tags "@createkanbanproject"
$ npx cucumber-js --tags "@changeissuetype"
$ npx cucumber-js --tags "@deletestoryissue"

```
