pipeline {
    agent any {
        stage('Testing'){
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }
    }
}