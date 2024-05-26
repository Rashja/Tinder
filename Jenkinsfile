pipeline {
    agent {
        docker {
            image 'node:18.20-alpine'
        }
    }
    stages {
        stage('Testing') {
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }
    }
}
