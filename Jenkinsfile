pipeline {
    agent {
        docker {
            image '18.20-alpine'
        }
    }
    stages {
        stage('Testing') {
            steps {
               sh 'cd frontend/'
               sh 'npm install'
               sh 'npm run test'
            }
        }
    }
}
