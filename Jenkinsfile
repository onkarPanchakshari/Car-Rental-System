pipeline {
    agent any

    options {
        skipDefaultCheckout()
        timestamps()
    }

    tools {
        maven 'Maven-3.9'
        nodejs 'Node-18'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'Git-token',
                    url: 'https://github.com/onkarPanchakshari/Car-Rental-System.git'
            }
        }

        stage('Build Java Backend') {
            steps {
                dir('CarRentalSystem') {
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Build Angular Frontend') {
            steps {
                dir('car_rental_angular') {
                    sh 'npm install'
                    sh 'npx ng build --configuration production'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('CarRentalSystem') {
                    sh 'mvn test'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & Test successful!'
        }
        failure {
            echo '❌ Build failed. Check Jenkins logs.'
        }
        always {
            cleanWs()
        }
    }
}
