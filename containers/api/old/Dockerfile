# FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# WORKDIR /app/

# # Install Poetry
# RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
#     cd /usr/local/bin && \
#     ln -s /opt/poetry/bin/poetry && \
#     poetry config virtualenvs.create false

# # Copy poetry.lock* in case it doesn't exist in the repo
# COPY ./app/pyproject.toml ./app/poetry.lock* /app/

# # Allow installing dev dependencies to run tests
# RUN poetry install --no-root --no-dev

# COPY ./app ./

# ENV PYTHONPATH=/app

#FROM fastapi-rest-api-crud/uvicorn-gunicorn-fastapi:python3.7

#COPY ./ ./

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

LABEL maintainer="Francisco Roa <franroav@gmail.com>"

WORKDIR /code

COPY ./app/requirements.txt /code/app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/app/requirements.txt

COPY ./app /code/app

CMD python main.py