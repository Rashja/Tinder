pipeline {
    agent {
        docker {
            image 'node:18.20-alpine' 
            args '-p 3000:3000'
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
