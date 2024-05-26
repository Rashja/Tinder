pipeline {
    agent {
        docker {
            image 'node:18.20-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run test'
                }
            }
        }
    }
}
