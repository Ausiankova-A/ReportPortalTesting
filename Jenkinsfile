pipeline {
    agent any

    triggers {
        cron('H 10 * * *') 
    }

    tools {
        nodejs "NodeJS 20"
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
                junit 'reports/**/*.xml'
            }
        }
    }
}
