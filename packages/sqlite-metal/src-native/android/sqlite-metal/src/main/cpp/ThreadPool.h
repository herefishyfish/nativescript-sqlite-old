#ifndef THREAD_POOL_H
#define THREAD_POOL_H

#include <thread>
#include <vector>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <atomic>
#include <functional>

class ThreadPool {
public:
    ThreadPool(unsigned int nThreads = std::thread::hardware_concurrency());
    ~ThreadPool();

    void enqueue(std::function<void()> f);

private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
    std::mutex queue_mutex;
    std::condition_variable condition;
    std::atomic<bool> stop;

    void workerThread();
};

#endif // THREAD_POOL_H
