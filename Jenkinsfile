pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building the container'
                sh 'docker image build . -t oci-nvidia-docker-gpu-tensorflow-demo:latest'
            }        
        }
        stage('Test') {
            steps {
                echo 'Placeholder for testing code'
                sleep 10
            }
        }
        stage('Login to registry') {
            steps {
                withCredentials([string(credentialsId: 'OCI_AUTH_TOKEN', variable: 'OCI_AUTH_TOKEN')]) {
                    sh "docker login lhr.ocir.io -u intrnayak/ramnath.nayak@oracle.com -p $OCI_AUTH_TOKEN"
                }
            }
        }
        stage('Push to registry') {
            steps {
                echo 'Push to registry'
                sleep 10
            }
        }
        stage('Deplay to environment') {
            steps {
                echo 'Deploy to env'
                sleep 10
            }
        }
    }
}
