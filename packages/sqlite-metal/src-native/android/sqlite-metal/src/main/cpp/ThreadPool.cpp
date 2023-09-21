#include "ThreadPool.h"

ThreadPool::ThreadPool(unsigned int nThreads) : stop(false) {
    for (unsigned int i = 0; i < nThreads; ++i) {
        workers.emplace_back([this] { this->workerThread(); });
    }
}

ThreadPool::~ThreadPool() {
    {
        std::lock_guard<std::mutex> lock(queue_mutex);
        stop = true;
    }
    condition.notify_all();
    for (std::thread &worker: workers) {
        if(worker.joinable()) worker.join();
    }
}

void ThreadPool::enqueue(std::function<void()> f) {
    {
        std::lock_guard<std::mutex> lock(queue_mutex);
        tasks.push(std::move(f));
    }
    condition.notify_one();
}

void ThreadPool::workerThread() {
    while (true) {
        std::function<void()> task;
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            condition.wait(lock, [this] { return stop.load() || !tasks.empty(); });
            if (stop.load() && tasks.empty()) {
                return;
            }
            task = std::move(tasks.front());
            tasks.pop();
        }
        task();
    }
}
