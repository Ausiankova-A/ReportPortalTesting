pipeline {
    agent any

    triggers {
        cron('H 10 * * *') 
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ausiankova-A/ReportPortalTesting.git'
            }
        }

        stage('Install') {
            steps {
                bat 'node -v && npm -v'
                bat 'npm install'
            }
        }
        stage('Prepare env') {
            steps {
                withCredentials([file(credentialsId: 'AA', variable: 'ENV_FILE')]) {
                    bat 'cp "$ENV_FILE" .env'
                }
            }
        }
        stage('Test') {
            steps {
                bat 'npm run test-wdio'
            }
        }

        stage('Publish Results') {
            steps {
                junit 'reports/**/*.xml'
            }
        }
    }
}
