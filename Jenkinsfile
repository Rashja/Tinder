pipeline {
    agent any 
    stages {
        stage('Testing') {
            steps {
               sh 'npm install'
               sh 'npm run test'
            }
        }
    }
}
