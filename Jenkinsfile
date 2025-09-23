pipeline {
    agent any

    tools {
        maven 'Maven3'
        jdk 'JDK11'
    }

    environment {
        SONARQUBE = credentials('sonar-token') // Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://your-git-repo-url/parkinglotsystem.git'
            }
        }

        stage('Build & Test') {
            steps {
                sh 'mvn clean verify'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh "mvn sonar:sonar -Dsonar.login=${SONARQUBE}"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        always {
            junit '**/target/surefire-reports/*.xml'
            jacoco execPattern: '**/target/jacoco.exec'
        }
    }
}
