FROM tensorflow/tensorflow:latest-devel-gpu-py3
EXPOSE 80
RUN apt-get update && apt-get install -y npm vim bash
RUN git clone https://github.com/tensorflow/models
RUN mkdir /tmp/imagenet
WORKDIR /tmp/imagenet
RUN wget http://download.tensorflow.org/models/image/imagenet/inception-2015-12-05.tgz
RUN tar xvfz inception-2015-12-05.tgz
WORKDIR /root/models/tutorials/image/imagenet
RUN npm init -f
RUN npm install n -g && n stable
RUN npm install --save express express-fileupload ansi-to-html
RUN git clone https://github.com/ramnathnayakpr/oci-nvidia-docker-gpu-tensorflow-demo
CMD node callpy.js
