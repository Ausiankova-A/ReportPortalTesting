pipeline {
    agent any

    triggers {
        // a) запуск каждый день в 10:00
        cron('H 10 * * *') 

        // b) запуск по webhook (GitHub push)
        // только если используешь GitHub
        pollSCM('* * * * *') // или используешь GitHub webhook
    }

    tools {
        nodejs "NodeJS 20" // Название в Jenkins (Manage Jenkins → Global Tool Configuration)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Ausiankova-A/ReportPortalTesting.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Prepare env') {
            steps {
                // Скачиваем секретный файл .env
                withCredentials([file(credentialsId: 'AA', variable: 'ENV_FILE')]) {
                    sh 'cp "$ENV_FILE" .env'
                }
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test-wdio'
            }
        }

        stage('Publish Results') {
            steps {
                junit 'reports/**/*.xml' // если тесты выводят JUnit xml
            }
        }
    }
}
