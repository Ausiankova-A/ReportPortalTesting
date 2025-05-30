pipeline {
    agent any

    triggers {
        cron('H 10 * * *') 
    }

    stage('Checkout') {
    steps {
        git url: 'https://github.com/Ausiankova-A/ReportPortalTesting.git', branch: env.BRANCH_NAME
    }
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
                    bat 'copy "%ENV_FILE%" .env'
                }
            }
        }
        stage('Test') {
            steps {
                bat 'npm run test-wdio CI'
            }
        }

        stage('Publish Results') {
            steps {
                junit testResults: 'reports/**/*.xml', allowEmptyResults: true
            }
        }
    }
}
