pipeline {
    agent any

    stages {
        stage('Login to registry') {
            steps {
                withCredentials([string(credentialsId: 'OCI_AUTH_TOKEN', variable: 'OCI_AUTH_TOKEN')]) {
                    sh "docker login lhr.ocir.io -u intrnayak/ramnath.nayak@oracle.com -p $OCI_AUTH_TOKEN"
                }
            }
        }
        stage('Build') {
            steps {
                echo 'Building the container'
                sh 'docker image build . -t lhr.ocir.io/intrnayak/oci-nvidia-docker-gpu-tensorflow-demo:latest'
            }        
        }
        stage('Push to registry') {
            steps {
                sh 'docker push lhr.ocir.io/intrnayak/oci-nvidia-docker-gpu-tensorflow-demo:$BUILD_NUMBER'
                sh 'docker push lhr.ocir.io/intrnayak/oci-nvidia-docker-gpu-tensorflow-demo:latest'
            }
        }
    }
}
